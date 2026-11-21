import api from "./api";

export async function getTickets() {
  const response = await api.get("/tickets");
  return response.data;
}

export async function createTicket(ticket) {
  const response = await api.post("/tickets", ticket);
  return response.data;
}

export async function updateTicketTitle(id, title) {
  const response = await api.patch(`/tickets/${id}/title`, {
    title,
  });

  return response.data;
}
export async function deleteTicket(id) {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
}

export async function updateTicketStatus(id, status) {
  const response = await api.patch(`/tickets/${id}/status`, {
    status,
  });

  return response.data;
}

export async function updateTicketDescription(id, description) {
  const response = await api.patch(`/tickets/${id}/description`, {
    description,
  });

  return response.data;
}

export async function updateTicketCategory(id, category) {
  const response = await api.patch(`/tickets/${id}/category`, {
    category,
  });

  return response.data;
}

export async function updateTicketPriority(id, priority) {
  const response = await api.patch(`/tickets/${id}/priority`, {
    priority,
  });

  return response.data;
}