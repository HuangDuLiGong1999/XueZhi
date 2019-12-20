package com.xuezhi.user.domain.entity;


public class History {
    private String id;
    private Long time;

    public void setId(String id) {
        this.id = id;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getId() {
        return id;
    }

    public Long getTime() {
        return time;
    }
}
