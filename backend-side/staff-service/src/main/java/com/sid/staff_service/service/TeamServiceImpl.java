package com.sid.staff_service.service;

import com.sid.staff_service.entity.Employee;
import com.sid.staff_service.entity.Team;
import com.sid.staff_service.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements ITeamService{
    private final TeamRepository teamRepository;

    @Override
    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));
    }

    @Override
    public Team updateTeam(Team team, Long id) {
        Team existingTeam = teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));

        existingTeam.setName(team.getName());
        existingTeam.setDescription(team.getDescription());
        existingTeam.setEmployees(team.getEmployees());

        return teamRepository.save(existingTeam);

    }

    @Override
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }
}
