package com.xuezhi.qa_service.adapter.in;


import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Description;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/qa")
public class QAController {

    @PostMapping("/questions")
    @ApiOperation("create a question by giving some details")
    public void addQuestion(@RequestParam String title,@RequestParam String description,@RequestParam String askerId, @RequestParam String school)
    {

    }

    @PutMapping("/questions")
    public void updateQuestion(@RequestParam String questionId,@RequestParam  String title,@RequestParam  String description)
    {

    }

    @DeleteMapping("/questions")
    public void deleteQuestion(@RequestParam String questionId)
    {

    }

    @PostMapping("/answers")
    public void addAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {

    }

    @PutMapping("/answers")
    public void updateAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {

    }

    @DeleteMapping("/answers")
    public void deleteAnswer(@RequestParam String questionId,@RequestParam  String authorId)
    {

    }
}
