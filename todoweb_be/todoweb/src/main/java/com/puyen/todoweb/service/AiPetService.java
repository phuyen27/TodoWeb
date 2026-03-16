package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Pet;
import com.puyen.todoweb.repository.PetRepository;
import com.puyen.todoweb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiPetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private TaskRepository taskRepository;

    public String chat(String userId, String message){

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        long unfinishedTasks = taskRepository.countByUserIdAndCompletedFalse(userId);

        String prompt = """
        You are a virtual pet.

        Pet name: %s
        Stage: %s
        Mood: %s
        Unfinished tasks: %d

        Owner message: %s

        Reply like a cute pet.
        """.formatted(
                pet.getName(),
                pet.getStage(),
                pet.getMood(),
                unfinishedTasks,
                message
        );

        return callAI(prompt);
    }
    public String callAI(String prompt){

        RestTemplate rest = new RestTemplate();

        Map<String,String> body = new HashMap<>();
        body.put("prompt", prompt);

        String url = "http://localhost:5678/webhook/pet-ai";

        Map response = rest.postForObject(url, body, Map.class);

        return response.get("reply").toString();
    }
}
