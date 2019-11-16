package com.xuezhi.user.domain.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="answer")
public class Answer {
    @Id
    private String id;
    private String questionId;
    private String respondentId;
    private String updateTime;

    public Answer(){}
    public Answer(String questionId, String respondentId, String updateTime, int likes, String description) {
        this.questionId = questionId;
        this.respondentId = respondentId;
        this.updateTime = updateTime;
        this.likes = likes;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getRespondentId() {
        return respondentId;
    }

    public void setRespondentId(String respondentId) {
        this.respondentId = respondentId;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private int likes;
    private String description;
}
