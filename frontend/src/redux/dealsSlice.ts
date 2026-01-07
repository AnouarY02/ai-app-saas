import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDeals, createDeal, updateDeal, deleteDeal, Deal, DealCreate, DealUpdate } from '../utils/apiClient';

interface DealsState {
  items: Deal[];
  loading: boolean;
  error: string | null;
}

const initialState: DealsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
  const res = await getDeals();
  return res.items;
});

export const addDeal = createAsyncThunk('deals/addDeal', async (data: DealCreate) => {
  return await createDeal(data);
});

export const editDeal = createAsyncThunk('deals/editDeal', async ({ id, data }: { id: string; data: DealUpdate }) => {
  return await updateDeal(id, data);
});

export const removeDeal = createAsyncThunk('deals/removeDeal', async (id: string) => {
  await deleteDeal(id);
  return id;
});

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deals';
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editDeal.fulfilled, (state, action) => {
        const idx = state.items.findIndex((d) => d.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeDeal.fulfilled, (state, action) => {
        state.items = state.items.filter((d) => d.id !== action.payload);
      });
  },
});

export default dealsSlice.reducer;
