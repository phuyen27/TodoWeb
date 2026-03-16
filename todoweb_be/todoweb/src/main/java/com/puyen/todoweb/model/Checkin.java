package com.puyen.todoweb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "checkins")
public class Checkin {
    @Id
    private String id;
    private String userId;
    private Date date;
    private Reward reward;
    public Checkin() {}
    public String getId() {return id;}

    public String getUserId() {return userId;}
    public void setUserId(String userId) { this.userId = userId; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public Reward getReward() { return reward; }
    public void setReward(Reward reward) { this.reward = reward; }
}
