package com.xuezhi.qa_service.domain.entity;

import java.util.Map;

public class Answer {

    //每个问题下一个用户只能回答一次，故authorId 作为主键
    private String authorId;

    private String updateTime;

    private String description;

    private Map<String, Object> likesMap;

    private int likes;

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, Object> getLikesMap() {
        return likesMap;
    }

    public void setLikesMap(Map<String, Object> likesMap) {
        this.likesMap = likesMap;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
