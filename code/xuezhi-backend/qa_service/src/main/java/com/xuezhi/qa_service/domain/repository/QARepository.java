package com.xuezhi.qa_service.domain.repository;

import com.xuezhi.qa_service.domain.entity.Answer;
import com.xuezhi.qa_service.domain.entity.Question;

import java.util.List;

public interface QARepository {

    public Question getQuestionByQuestionId(String questionId);

    public List<Question> getQuestionByAskerId(String askerId);

    public List<Answer> getAnswerListByQuestionId(String questionId);

    public void addQuestion(String title, String description, String askerId, String school);

    public void updateQuestion(String questionId, String title, String description);

    public void deleteQuestion(String questionId);

    public void addAnswer(String questionId, String authorId, String description);

    public void updateAnswer(String questionId, String authorId, String description);

    public void deleteAnswer(String questionId, String authorId);
}
