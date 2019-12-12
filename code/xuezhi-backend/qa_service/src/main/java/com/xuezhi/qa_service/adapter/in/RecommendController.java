package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.application.QAApplication;
import com.xuezhi.qa_service.domain.entity.General;
import com.xuezhi.qa_service.domain.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class RecommendController {

    private QAApplication qaApplication;

    @Autowired
    public RecommendController(QAApplication qaApplication){
        this.qaApplication = qaApplication;
    }

    /*
    @GetMapping("/recommands")
    public List<General> getRecommands()
    {
        return null;
    }

    */

    @GetMapping("/recommends")
    public List<Map<String, Object>> getRecommends() throws IOException {
        return qaApplication.getRecommends();
    }
}
