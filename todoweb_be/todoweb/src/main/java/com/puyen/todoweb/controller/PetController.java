package com.puyen.todoweb.controller;

import com.puyen.todoweb.dto.CreatePetRequest;
import com.puyen.todoweb.model.Pet;
import com.puyen.todoweb.service.AiPetService;
import com.puyen.todoweb.service.PetService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private AiPetService aiPetService;

    @PostMapping("/create")
    public Pet createPet(
            @RequestBody CreatePetRequest request
    ) {
        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return petService.createPet(userId,request.getType(),request.getName());
    }

    @GetMapping
    public Pet getPet (){
        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        petService.updateMood(userId);
        return petService.getPet(userId);
    }

    @PostMapping("/chat")
    public String chat(
            @RequestBody Map<String,String> body
           ){

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        petService.updateMood(userId);
        return aiPetService.chat(userId, body.get("message"));
    }
}
