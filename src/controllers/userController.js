import { StatusCodes } from 'http-status-codes';
import twilio from 'twilio';

import {
  TWILIO_PHONE_NUMBER,
  TWILIO_SID,
  TWILIO_TOKEN
} from '../config/serverConfig.js';
import { catchAsyncError } from '../middlewares/catchAsycError.js';
import ErrorHandler from '../middlewares/error.js';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import { sendToken } from '../utils/sendToken.js';

const client = twilio(TWILIO_SID, TWILIO_TOKEN);

export const registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, phone, verificationMethod } = req.body;
    if (!name || !email || !password || !phone || !verificationMethod) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields are required')
      );
    }

    function validatePhoneNumber(phone) {
      const regex = /^\+\d{1,3}\d{7,14}$/;
      return regex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'Phone number is not valid')
      );
    }

    const existingUser = await User.findOne({
      $or: [
        { email, accountVerified: true },
        { phone, accountVerified: true }
      ]
    });

    if (existingUser) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'User already exists')
      );
    }

    const registrationAttemptUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false }
      ]
    });

    if (registrationAttemptUser.length > 10) {
      return next(
        new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          'You have reached the limit of registration attempts (10). Try again later'
        )
      );
    }

    const user = await User.create({ name, email, password, phone });

    // Generate and save the verification code
    const verificationCode = await user.generateVerificationCode();
    await user.save();

    // Send verification code and wait for it to complete before responding
    await sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      phone,
      email
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register User Error:', error);
    if (!res.headersSent) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }
});

// ✅ Fixed: `sendVerificationCode` no longer sends multiple responses
export const sendVerificationCode = async (
  verificationMethod,
  verificationCode,
  name,
  phone,
  email
) => {
  try {
    // console.log(`Verification code: ${verificationCode}`);

    if (verificationMethod === 'email') {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({ email, subject: 'Email Verification Needed', message });
    } else if (verificationMethod === 'phone') {
      const verificationCodeWithSpace = verificationCode
        .toString()
        .split('')
        .join(' ');

      await client.calls.create({
        twiml: `<Response><Say> Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.  Your code will expire in 10 minutes</Say></Response>`,
        from: TWILIO_PHONE_NUMBER,
        to: phone
      });
    } else {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        'Invalid verification method'
      );
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
};

// ✅ Fixed: `verifyOTP` ensures only one response is sent
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, phone } = req.body;

    function validatePhoneNumber(phone) {
      const regex = /^\+\d{1,3}\d{7,14}$/;
      return regex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'Invalid phone number format')
      );
    }

    const userAllEntries = await User.find({
      $or: [
        { email, accountVerified: false },
        { phone, accountVerified: false }
      ]
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return next(new ErrorHandler(StatusCodes.BAD_REQUEST, 'User not found'));
    }

    let user = userAllEntries[0];

    if (userAllEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { email, accountVerified: false },
          { phone, accountVerified: false }
        ]
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'Invalid verification code')
      );
    }

    const verificationCodeExpire = new Date(
      user.verifecationCodeExpire
    ).getTime();
    if (Date.now() > verificationCodeExpire) {
      return next(
        new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          'Verification code has expired'
        )
      );
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verifecationCodeExpire = null;
    await user.save({ validateBeforeSave: true });

    sendToken(user, StatusCodes.OK, 'User verified successfully', res);
  } catch (error) {
    console.error('Error verifying user', error);
    if (!res.headersSent) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error verifying user'
      });
    }
  }
};

// ✅ Fixed: Generates email template
function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #ececec; border-radius: 10px; background-color: #ffffff; text-align: left;">
      <h2 style="color: #222222; text-align: center;">Email Verification Needed</h2>
      <p style="font-size: 16px; color: #444444;">Hello,</p>
      <p style="font-size: 16px; color: #444444;">Please use the verification code below to verify your email address and complete the registration process:</p>
      <div style="font-size: 26px; font-weight: bold; margin: 20px 0; background-color: #28a745; color: #ffffff; padding: 15px; text-align: center; border-radius: 5px;">
        ${verificationCode}
      </div>
      <p style="margin-top: 30px; font-size: 14px; color: #666666;">If you did not initiate this request, please disregard this email.</p>
      <p style="font-size: 12px; color: #888888; margin-top: 20px;">Thank you,<br>Your Team</p>
    </div>
  `;
}
