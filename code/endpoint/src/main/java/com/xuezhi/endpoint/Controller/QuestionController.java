package com.xuezhi.endpoint.Controller;


import com.xuezhi.endpoint.Entity.Question;
import com.xuezhi.endpoint.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/questions")
public class QuestionController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Question> getQuestion(){
        return questionRepository.findAll();
    }
}
