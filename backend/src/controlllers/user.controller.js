import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if(!userId) {
    throw new ApiError(404, 'Unauthorized request');
  }
  
  const user = await User.findById(userId);

  if(!user) {
    throw new ApiError(404, 'User not found');
  }

  const isAdmin = user.role === 'admin' ? true : false

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {
        user,
        isAdmin
      },
      'Current User fetched successfully'
    )
  )
});

export { getCurrentUser }