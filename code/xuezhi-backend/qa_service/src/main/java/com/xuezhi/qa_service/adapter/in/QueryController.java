package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.application.QAApplication;
import com.xuezhi.qa_service.domain.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class QueryController {

    private QAApplication qaApplication;

    @Autowired
    public QueryController(QAApplication qaApplication){
        this.qaApplication = qaApplication;
    }

    @GetMapping(value="/questions/{askerid}")
    public List<Map<String, String>> getQuestionByAskerId(@PathVariable("askerid") String askerid)
    {
        return qaApplication.getQuestionByAskerId(askerid);
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

    @GetMapping(value = "/schools")
    public List<String> getSchoolList(){
        return qaApplication.getAllSchoolList();
    }
}
