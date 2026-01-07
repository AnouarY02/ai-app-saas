import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, createContact, updateContact, deleteContact, Contact, ContactCreate, ContactUpdate } from '../utils/apiClient';

interface ContactsState {
  items: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const res = await getContacts();
  return res.items;
});

export const addContact = createAsyncThunk('contacts/addContact', async (data: ContactCreate) => {
  return await createContact(data);
});

export const editContact = createAsyncThunk('contacts/editContact', async ({ id, data }: { id: string; data: ContactUpdate }) => {
  return await updateContact(id, data);
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (id: string) => {
  await deleteContact(id);
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const idx = state.items.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
