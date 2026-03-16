package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Checkin;
import com.puyen.todoweb.model.Reward;
import com.puyen.todoweb.repository.CheckinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CheckinService {
    @Autowired
    private CheckinRepository checkinRepository;

    @Autowired
    private PetService petService;

    public Checkin checkin(String userId) {
        Date today = new Date();

        if(checkinRepository.findByUserIdAndDate(userId, today).isPresent()) {
            throw new RuntimeException("Already checkin today!");
        }

        Checkin checkin = new Checkin();

        checkin.setUserId(userId);
        checkin.setDate(today);

        Reward reward = new Reward();
        reward.setPetGrowth(1);

        checkin.setReward(reward);

        checkinRepository.save(checkin);
        petService.growPet(userId);

        return checkin;
    }
}

