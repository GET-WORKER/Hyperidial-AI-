import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchcustomerById } from "../../people/customers/customer-slice";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_HOST}/tickets`;
const userToken = sessionStorage.getItem("userToken");

export const fetchAllTickets = createAsyncThunk(
  "ticket/fetchAllTickets",
  async ({ page, size, filter }, { getState, rejectWithValue }) => {
    try {
      const params = {};
      if (page !== 0) params.skip = page;
      if (size !== 0) params.take = size;
      if (filter) params.filter = filter;
      const response = await axios.get(API_URL, { params: params });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  "tickets/fetchTicketById",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticket) => {
    try {
      const response = await axios.post(API_URL, ticket);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (tickets, { getState, rejectWithValue }) => {
    const { ticket } = getState().ticket;
    try {
      const response = await axios.put(`${API_URL}/${ticket.id}`, tickets);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeTicket = createAsyncThunk(
  "tickets/removeTicket",
  async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchTicketCommunicationById = createAsyncThunk(
  "tickets/fetchTicketCommunicationById",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}/communications/tickets/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createCommunication = createAsyncThunk(
  "Communications/createCommunication",
  async (communication) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/communications`,
        communication
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchClosureAttachmentsById = createAsyncThunk(
  "ticket/fetchClosureAttachmentsById",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}/closure-attachments/${id}`
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  tickets: [],
  ticket: null,
  customer: {},
  communications: [],
  closure_attachments: [],
  search: "",
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  mode: null,
  isCustomerSelect: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.ticket = action.payload;
    },

    setCustomer: (state, action) => {
      state.ticket.customer = action.payload.data;
      state.isCustomerSelect = action.payload.state;
    },

    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        /* state.ticket = action.payload.tickets[0];
        state.customer = action.payload.tickets[0].customer; */
        state.currentPage = 1;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTicketCommunicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketCommunicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.communications = action.payload;
      })
      .addCase(fetchTicketCommunicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchcustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.communications = action.payload;
      })
      .addCase(fetchcustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchClosureAttachmentsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClosureAttachmentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.closure_attachments = action.payload;
      })
      .addCase(fetchClosureAttachmentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
        toast.success("Ticket created successfully!");
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCommunication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommunication.fulfilled, (state, action) => {
        state.loading = false;
        state.communications.push(action.payload);
        toast.success("Message sent successfully!");
      })
      .addCase(createCommunication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.mode = "view";
        toast.success("Ticket updated successfully!");
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== action.payload
        );
        toast.success("Ticket deleted successfully!");
      })
      .addCase(removeTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setTicket, setCustomer, setMode, setCurrentPage, setSearch } =
  ticketSlice.actions;
export default ticketSlice.reducer;
