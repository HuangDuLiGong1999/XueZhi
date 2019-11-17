package com.xuezhi.endpoint.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="question")
public class Question {
    @Id
    private String id;
    private String askerId;
    private String updateTime;
    private boolean ifPublic;
    private List<String> answerId;
    private String title;
    private String description;

    public Question(){}

    public Question(String askerId, String updateTime, boolean ifPublic, List<String> answerId, String title, String description) {
        this.askerId = askerId;
        this.updateTime = updateTime;
        this.ifPublic = ifPublic;
        this.answerId = answerId;
        this.title = title;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAskerId() {
        return askerId;
    }

    public void setAskerId(String askerId) {
        this.askerId = askerId;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public boolean isIfPublic() {
        return ifPublic;
    }

    public void setIfPublic(boolean ifPublic) {
        this.ifPublic = ifPublic;
    }

    public List<String> getAnswerId() {
        return answerId;
    }

    public void setAnswerId(List<String> answerId) {
        this.answerId = answerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
