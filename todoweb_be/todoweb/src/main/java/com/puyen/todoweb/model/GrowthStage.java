package com.puyen.todoweb.model;

public class GrowthStage {
    private String stage;
    private int minDays;
    private String image;

    public GrowthStage(){}

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public int getMinDays() { return minDays; }
    public void setMinDays(int minDays) { this.minDays = minDays; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
