package com.xuezhi.endpoint.Controller;

import com.xuezhi.endpoint.Entity.Answer;
import com.xuezhi.endpoint.Entity.Question;
import com.xuezhi.endpoint.Entity.User;
import com.xuezhi.endpoint.Repository.QuestionRepository;
import com.xuezhi.endpoint.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/test")
public class SaveController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping(value="/save")
    public User save(){
        User user = new User();
        user.setEmail("12345");
        user.setName("567");
        user.setPassword("12345678");
        mongoTemplate.save(user);
        return user;
    }

    @GetMapping(value="/savequestion")
    public Question question(){
        Question question = new Question();
        question.setAskerId("5dcd36b4789ab28c4fa31458");
        question.setTitle("Study Problem");
        question.setDescription("bababababababababababababababbaaaaaaaaaaaa");
        question.setIfPublic(true);
        Date odate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = sdf.format(odate);
        question.setUpdateTime(date);
        mongoTemplate.save(question);
        return question;
    }

    @GetMapping(value="/updatequestion")
    public Question updatequestion(){
        Question question = questionRepository.findOneById("5dcd4d7d646f78503fe06306");
        Date odate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = sdf.format(odate);
        question.setUpdateTime(date);
        List<String> answerId = new ArrayList<String>();
        answerId.add("5dcd37d1789ab28c4fa31459");
        question.setAnswerId(answerId);
        mongoTemplate.save(question);
        return question;
    }
    /*
    @GetMapping(value = "/saveanswer")
    public Answer answer(){
        Answer answer = new Answer();
        //另外获取，不可自行设置
        answer.setQuestionId("");
    }

     */
}
