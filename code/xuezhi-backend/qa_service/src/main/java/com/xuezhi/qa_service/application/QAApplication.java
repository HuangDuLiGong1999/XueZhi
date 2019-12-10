package com.xuezhi.qa_service.application;

import com.xuezhi.qa_service.domain.repository.QARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QAApplication {
    private QARepository qaRepository;

    @Autowired
    public QAApplication(QARepository qaRepository){
        this.qaRepository = qaRepository;
    }

    public void addQuestion(String title, String description, String askerId, String school){
        qaRepository.addQuestion(title, description, askerId, school);
    }

    public void updateQuestion(String questionId, String title, String description){
        qaRepository.updateQuestion(questionId, title, description);
    }

    public void deleteQuestion(String questionId){
        qaRepository.deleteQuestion(questionId);
    }

    public void addAnswer(String questionId, String authorId, String description){
        qaRepository.addAnswer(questionId, authorId, description);
    }

    public void updateAnswer(String questionId, String authorId, String description){
        qaRepository.updateAnswer(questionId, authorId, description);
    }

    public void deleteAnswer(String questionId, String authorId){
        qaRepository.deleteAnswer(questionId, authorId);
    }
}
