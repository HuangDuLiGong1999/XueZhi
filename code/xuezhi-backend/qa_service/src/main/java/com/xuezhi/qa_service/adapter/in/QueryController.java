package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.domain.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QueryController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping(value="/questions/{askerid}")
    public List<Question> getQuestionByAskerId(@PathVariable("askerid") String askerid)
    {
        return null;
    }

    @GetMapping(value="/answers/{authorid}")
    public List<Question> getAnswerByAuthorId(@PathVariable("authorid") String authorid)
    {
        return null;
    }

    @GetMapping(value="/answers/regex/{regex}")
    public List<Question> getQuestionByRegex(@PathVariable("regex") String regex)
    {
        Query query = new Query(Criteria.where("title").regex(regex));
        List<Question> list2 = mongoTemplate.find(query,Question.class,"question");
        for(Question a : list2)
        {
            System.out.println(a.getTitle());
        }

        return null;
    }

}
