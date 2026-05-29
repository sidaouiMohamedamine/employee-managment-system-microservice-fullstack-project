package com.sid.staff_service.service;

import com.sid.staff_service.entity.Employee;
import com.sid.staff_service.entity.Team;

import java.util.List;

public interface ITeamService {
    public Team createTeam(Team team);
    public List<Team> getAllTeams();
    public Team getTeamById(Long id);

    public Team updateTeam(Team team,Long id);
    public void deleteTeam(Long id);

}
