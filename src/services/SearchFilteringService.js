import Event from '../models/eventModel.js';

export const getSearchEvent = async (query) => {
  let filter = { isActive: true };

  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }

  if (query.location) {
    filter.location = query.location;
  }

  if (query.category) {
    filter.category = query.category;
  }

  // console.log('Query:', query);
  // console.log('Applied Filter:', filter);

  const result = await Event.find(filter);
  // console.log('Final Result from DB:', result);

  return result;
};

export const getVendorCategories = async () => {
  return await Event.distinct('category');
};
