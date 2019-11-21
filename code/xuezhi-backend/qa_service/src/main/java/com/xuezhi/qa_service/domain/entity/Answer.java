package com.xuezhi.qa_service.domain.entity;

//todo @document
public class Answer {

    //每个问题下一个用户只能回答一次，故authorId 作为主键
    private String authorId;

    private String updateTime;

    private String description;

    private int likes;
}
