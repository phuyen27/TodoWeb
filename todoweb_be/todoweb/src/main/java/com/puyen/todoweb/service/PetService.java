package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Checkin;
import com.puyen.todoweb.model.GrowthStage;
import com.puyen.todoweb.model.Pet;
import com.puyen.todoweb.repository.CheckinRepository;
import com.puyen.todoweb.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private CheckinRepository checkinRepository;
    public Pet createPet(String userId, String type, String name) {
        if(petRepository.findByUserId(userId).isPresent()){
            throw new RuntimeException("User already has a pet!");
        }

        Pet pet = new Pet();

        pet.setUserId(userId);
        pet.setType(type);
        pet.setName(name);

        pet.setStage("baby");
        pet.setAgeDays(0);
        pet.setMood("happy");
        pet.setGrowthStages(defaultGrowthStages(type));

        pet.setCreatedAt(new java.util.Date());

        return petRepository.save(pet);
    }

    private List<GrowthStage> defaultGrowthStages(String type){

        List<GrowthStage> stages = new ArrayList<>();

        GrowthStage baby = new GrowthStage();
        baby.setStage("baby");
        baby.setMinDays(0);
        baby.setImage("/pets/" + type + "/baby.png");

        GrowthStage teen = new GrowthStage();
        teen.setStage("teen");
        teen.setMinDays(7);
        teen.setImage("/pets/" + type + "/teen.png");

        GrowthStage adult = new GrowthStage();
        adult.setStage("adult");
        adult.setMinDays(30);
        adult.setImage("/pets/" + type + "/adult.png");

        stages.add(baby);
        stages.add(teen);
        stages.add(adult);

        return stages;
    }

    public Pet getPet(String userId) {
        return petRepository.findByUserId(userId).orElse(null);
    }

    public Pet growPet(String userId) {

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        pet.setAgeDays(pet.getAgeDays() + 1);

        updateStage(pet);

        return petRepository.save(pet);
    }

    private void updateStage(Pet pet) {
        int age = pet.getAgeDays();

        GrowthStage stage = pet.getGrowthStages()
                .stream()
                .filter(s -> age >= s.getMinDays())
                .max(Comparator.comparingInt(GrowthStage::getMinDays))
                .orElse(null);

        if(stage != null) {
            pet.setStage(stage.getStage());
        }
    }

    public void growFromTask(String userId){

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        pet.setAgeDays(pet.getAgeDays() + 1);

        updateStage(pet);

        petRepository.save(pet);
    }

    public void updateMood(String userId){

        Optional<Checkin> last = checkinRepository
                .findTopByUserIdOrderByDateDesc(userId);

        if(last.isEmpty()){
            return;
        }

        long diff = new Date().getTime() - last.get().getDate().getTime();

        long days = diff / (1000 * 60 * 60 * 24);

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        if(days >= 2){
            pet.setMood("sad");
        } else {
            pet.setMood("happy");
        }

        petRepository.save(pet);
    }

    public void setHappy(String userId){

        Pet pet = petRepository.findByUserId(userId).orElseThrow();

        pet.setMood("happy");

        petRepository.save(pet);
    }
}
