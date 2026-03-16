package com.puyen.todoweb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document("pets")
public class Pet {
    @Id
    private String id;
    private String userId;
    private String type;
    private String name;
    private String stage;
    private int ageDays;
    private String mood;

    private List<GrowthStage> growthStages;
    private Date createdAt;

    public Pet() {}

    public String getId() {return id;}

    public String getUserId() {return userId;}
    public void  setUserId(String userId) {this.userId = userId;}

    public String getType() {return type;}
    public void  setType(String type) {this.type = type;}

    public String getName() {return name;}
    public void  setName(String name) {this.name = name;}

    public String getStage() {return stage;}
    public void setStage(String stage) {this.stage = stage;}

    public int getAgeDays() {return ageDays;}
    public void setAgeDays(int ageDays) { this.ageDays = ageDays; }

    public List<GrowthStage> getGrowthStages() { return growthStages; }
    public void setGrowthStages(List<GrowthStage> growthStages) { this.growthStages = growthStages; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public String setMood(String mood) {
        return this.mood = mood;
    }

    public String getMood() { return this.mood; }
}
