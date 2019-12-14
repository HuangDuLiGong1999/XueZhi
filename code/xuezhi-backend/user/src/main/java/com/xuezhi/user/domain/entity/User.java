package com.xuezhi.user.domain.entity;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Document(collection="user")
public class User {
    @Id
    private String id;
    private String email;
    private String telephone;
    private String name;
    private String password;
    private String signature;
    private int age;
    private String sex;
    private String university;
    private Binary avatar;
    private Binary verImage;
    private List<History> historyList;
    private List<String> questionIdList;

    public User(){}
    public User(String email, String telephone, String name, int age, String sex, String university, String password, String signature) {
        this.email = email;
        this.telephone = telephone;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.university = university;
        this.password = password;
        this.signature = signature;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Binary getAvatar() {
        return avatar;
    }

    public void setAvatar(Binary avatar) {
        this.avatar = avatar;
    }

    public Binary getVerImage() {
        return verImage;
    }

    public void setVerImage(Binary verImage) {
        this.verImage = verImage;
    }

    public List<History> getHistoryList() {
        if (historyList == null){
            historyList = new ArrayList<>();
        }
        return historyList;
    }

    public void setHistoryList(List<History> historyList) {
        this.historyList = historyList;
    }

    public List<String> getQuestionIdList() {
        if (questionIdList == null){
            questionIdList = new ArrayList<>();
        }
        return questionIdList;
    }

    public void setQuestionIdList(List<String> questionIdList) {
        this.questionIdList = questionIdList;
    }
}
