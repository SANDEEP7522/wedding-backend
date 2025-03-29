import { StatusCodes } from 'http-status-codes';
import twilio from 'twilio';

import {
  TWILIO_PHONE_NUMBER,
  TWILIO_SID,
  TWILIO_TOKEN
} from '../config/serverConfig.js';
import { catchAsyncError } from '../middlewares/catchAsycError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';

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
      const regex = /^[6789]\d{9}$/; // Starts with 6,7,8,9 & has exactly 10 digits
      return regex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'Phone number is not valid')
      );
    }

    const exitingUser = await User.findOne({
      $or: [
        { email: email, accountVerified: true },
        { phone: phone, accountVerified: true }
      ]
    });

    if (exitingUser) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'User already exists')
      );
    }

    const registerationAttemptUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false }
      ]
    });

    if (registerationAttemptUser.length > 10) {
      return next(
        new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          'You have reached the limit of registration attempts (4). Try again an hour later'
        )
      );
    }

    const userData = {
      name,
      email,
      password,
      phone
    };

    const user = await User.create(userData);

    // Generate a verification code for the user and save it to the database
    const verificationCode = await user.generateVerificationCode();
    await user.save();

    // Send the verification code to the user via the specified verification method (e.g. SMS or email)
    sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      phone,
      email,
      res
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.log('Register User Error', error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
});

// Implement the logic to send the verification code to the user via the specified verification method (e.g. SMS or email)
export const sendVerificationCode = async (
  verificationMethod,
  verificationCode,
  name,
  phone,
  email,
  res
) => {
  console.log(`Verification code: ${verificationCode}`);
  try {
    if (verificationMethod === 'email') {
      // Send verification code via email
      const message = generateEmailTemplate(verificationCode);
      sendEmail({ email, subject: 'Email Verification Needed', message });
      res.status(StatusCodes.OK).json({
        success: true,
        message: `Verification code sent to your email ${name}`
      });
    } else if (verificationMethod === 'phone') {
      // Send verification code via phone call
      const verificationCodeWithSpace = verificationCode
        .toString()
        .split('')
        .join(' ');

      await client.calls.create({
        twiml: `<Response><Say> Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.  Your code will expire in 10 minutes</Say></Response>`,
        from: TWILIO_PHONE_NUMBER,
        to: phone
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Verification code sent to your phone'
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid verification method'
      });
    }
  } catch (error) {
    console.log('Error sending verification code', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error sending verification code'
    });
  }
};

// Generate the email template for the verification code
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
      <p style="font-size: 12px; color: #888888; margin-top: 20px;">Thank you,<br>Your Company Team</p>
    </div>
  `;
}

console.log(generateEmailTemplate('123456'));
