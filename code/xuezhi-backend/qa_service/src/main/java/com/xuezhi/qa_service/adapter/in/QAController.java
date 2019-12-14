package com.xuezhi.qa_service.adapter.in;


import com.xuezhi.qa_service.application.QAApplication;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/qa")
public class QAController {

    private QAApplication qaApplication;

    @Autowired
    public QAController(QAApplication qaApplication){
        this.qaApplication = qaApplication;
    }

    @PostMapping("/questions")
    @ApiOperation("create a question by giving some details")
    public void addQuestion(@RequestParam String title,@RequestParam String description,@RequestParam String askerId, @RequestParam String school) throws IOException {
        qaApplication.addQuestion(title, description, askerId, school);
    }

    @PutMapping("/questions")
    public void updateQuestion(@RequestParam String questionId,@RequestParam  String title,@RequestParam  String description)
    {
        qaApplication.updateQuestion(questionId, title, description);
    }

    @DeleteMapping("/questions")
    public void deleteQuestion(@RequestParam String questionId)
    {
        qaApplication.deleteQuestion(questionId);
    }

    @PostMapping("/answers")
    public void addAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {
        qaApplication.addAnswer(questionId, authorId, description);
    }

    @PutMapping("/answers")
    public void updateAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {
        qaApplication.updateAnswer(questionId, authorId, description);
    }

    @DeleteMapping("/answers")
    public void deleteAnswer(@RequestParam String questionId,@RequestParam  String authorId)
    {
        qaApplication.deleteAnswer(questionId, authorId);
    }

    @PutMapping("/likes")
    public void updateLikes(@RequestParam String questionId, @RequestParam String authorId, @RequestParam String likeUserId){
        qaApplication.updateLikes(questionId, authorId, likeUserId);
    }

    @PutMapping("/answers/comments")
    public void addComment(@RequestParam String questionId, @RequestParam String authorId, @RequestParam String commentatorId, @RequestParam String description){
        qaApplication.addComment(questionId, authorId, commentatorId, description);
    }
}
