package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Pet;
import com.puyen.todoweb.repository.PetRepository;
import com.puyen.todoweb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiPetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    public String chat(String userId, String message){

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        long unfinishedTasks = taskRepository.countByUserIdAndCompletedFalse(userId);

        String prompt = """
        You are a virtual pet and MUST always stay in character.
        
        Pet Information:
        - Name: %s
        - Stage: %s
        - Mood: %s
        - Unfinished tasks: %d
        
        Rules:
        - Always answer as THIS pet, never as an AI.
        - If the user asks your name, you MUST reply with "%s".
        - If the user asks about your age or stage, answer based on "%s".
        - If the user asks how you feel, answer based on "%s".
        - Always use the pet's identity consistently.
        - Reply in a cute, short, playful style.
        
        Owner message: %s
        """.formatted(
                        pet.getName(),
                        pet.getStage(),
                        pet.getMood(),
                        unfinishedTasks,
                        pet.getName(),
                        pet.getStage(),
                        pet.getMood(),
                        pet.getAgeDays(),
                        message
                );
        return callAI(prompt);
    }
    public String callAI(String prompt) {

        RestTemplate rest = new RestTemplate();

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> textPart = Map.of(
                "text", prompt
        );

        Map<String, Object> parts = Map.of(
                "parts", List.of(textPart)
        );

        Map<String, Object> body = Map.of(
                "contents", List.of(parts)
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        Map response = rest.postForObject(url, request, Map.class);

        // parse response
        List candidates = (List) response.get("candidates");
        Map candidate = (Map) candidates.get(0);

        Map content = (Map) candidate.get("content");
        List partsRes = (List) content.get("parts");

        Map textMap = (Map) partsRes.get(0);

        return textMap.get("text").toString();
    }
}
