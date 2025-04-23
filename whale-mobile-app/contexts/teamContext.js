// contexts/TeamContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../services/teamService";
import { useAuth } from "./AuthContext";

const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userRole === "owner") {
      loadTeamData();
    }
  }, [isAuthenticated, userRole]);

  const loadTeamData = async () => {
    if (!isAuthenticated || userRole !== "owner") return;

    setLoading(true);
    try {
      const data = await getTeamMembers();
      setTeamMembers(data || []);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados da equipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (memberData) => {
    setLoading(true);
    try {
      const newMember = await addTeamMember(memberData);
      setTeamMembers([...teamMembers, newMember]);
      return { success: true, member: newMember };
    } catch (err) {
      setError("Falha ao adicionar membro");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateMember = async (id, memberData) => {
    setLoading(true);
    try {
      const updated = await updateTeamMember(id, memberData);
      const updatedList = teamMembers.map((m) => (m._id === id ? updated : m));
      setTeamMembers(updatedList);
      return { success: true, member: updated };
    } catch (err) {
      setError("Falha ao atualizar membro");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    setLoading(true);
    try {
      await deleteTeamMember(id);
      setTeamMembers(teamMembers.filter((m) => m._id !== id));
      return { success: true };
    } catch (err) {
      setError("Falha ao excluir membro");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        teamMembers,
        loading,
        error,
        loadTeamData,
        addMember,
        updateMember,
        deleteMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
