package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.application.QAApplication;
import com.xuezhi.qa_service.domain.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QueryController {

    private QAApplication qaApplication;

    @Autowired
    public QueryController(QAApplication qaApplication){
        this.qaApplication = qaApplication;
    }

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
        return qaApplication.getQuestionByRegex(regex);
    }

    @GetMapping(value = "/question/{questionId}")
    public Question getQuestionByQuestionId(@PathVariable("questionId") String questionId){
        return qaApplication.getQuestionByQuestionId(questionId);
    }
}
