package com.puyen.todoweb.controller;
import com.puyen.todoweb.model.Checkin;
import com.puyen.todoweb.service.CheckinService;

import com.puyen.todoweb.service.PetService;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkin")
public class CheckinController {

    @Autowired
    private CheckinService checkinService;

    @Autowired
    private PetService petService;

    @PostMapping
    public Checkin checkin(HttpServletRequest request){

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        Checkin checkin = checkinService.checkin(userId);

        petService.setHappy(userId);

        return checkin;
    }
}