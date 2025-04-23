// services/teamService.js
import api from "./api";

export const getTeamMembers = async () => {
  const response = await api.get("/team");
  return response.data;
};

export const getTeamMember = async (id) => {
  const response = await api.get(`/team/${id}`);
  return response.data;
};

export const addTeamMember = async (memberData) => {
  const response = await api.post("/team", memberData);
  return response.data;
};

export const updateTeamMember = async (id, memberData) => {
  const response = await api.put(`/team/${id}`, memberData);
  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/${id}`);
  return response.data;
};

export const getTeamMemberReports = async (id) => {
  const response = await api.get(`/team/${id}/reports`);
  return response.data;
};
