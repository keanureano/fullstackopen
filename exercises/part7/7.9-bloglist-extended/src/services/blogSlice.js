import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = {
  blogs: [],
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await blogService.getAll();
  return response;
});

export const createNewBlog = createAsyncThunk(
  "blogs/createNewBlog",
  async (newBlog) => {
    const response = await blogService.create(newBlog);
    return response;
  }
);

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (blog) => {
  const response = await blogService.put(blog);
  return response;
});

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blog) => {
    await blogService.remove(blog);
    return blog;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.blogs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
  },
});

export const { addBlog } = blogSlice.actions;
export default blogSlice.reducer;
