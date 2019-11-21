package com.xuezhi.qa_service.adapter.in;

import com.xuezhi.qa_service.domain.entity.General;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class recommandController {

    @GetMapping("/recommands")
    public List<General> getRecommands()
    {
        return null;
    }
}
