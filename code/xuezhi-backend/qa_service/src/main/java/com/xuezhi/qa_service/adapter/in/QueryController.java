package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.domain.entity.Question;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QueryController {

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

}
