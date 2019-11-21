package com.xuezhi.qa_service.adapter.out;

import com.xuezhi.qa_service.domain.entity.Answer;
import com.xuezhi.qa_service.domain.entity.Question;
import com.xuezhi.qa_service.domain.repository.QARepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class QARepositoryImpl implements QARepository {

    @Autowired
    private QARepositor qaRepositor;

    @Override
    public Question getQuestionByQuestionId(String questionId)
    {
        return qaRepositor.findQuestionByQuestionId(questionId);
    }

    public List<Question> getQuestionByAskerId(String askerId)
    {
        return qaRepositor.findQuestionByAskerId(askerId);
    }

    public List<Answer> getAnswerListByQuestionId(String questionId)
    {
        return null;
    }

    public void addQuestion(String title, String description, String askerId, String school)
    {
        Question q = new Question();
        q.setTitle(title);
        q.setDescription(description);
        q.setAskerId(askerId);
        q.setSchool(school);
        q.setUpdateTime(getUpdateTime());
        qaRepositor.save(q);
    }

    public void updateQuestion(String questionId, String title, String description)
    {
        Question q = qaRepositor.findQuestionByQuestionId(questionId);
        q.setTitle(title);
        q.setDescription(description);
        q.setUpdateTime(getUpdateTime());
        qaRepositor.save(q);
    }

    public void deleteQuestion(String questionId)
    {
        qaRepositor.deleteQuestionByQuestionId(questionId);
    }

    public void addAnswer(String questionId, String authorId, String description)
    {

    }

    public void updateAnswer(String questionId, String authorId, String description)
    {

    }

    public void deleteAnswer(String questionId, String authorId)
    {

    }

    private String getUpdateTime()
    {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String str = sdf.format(date);
        return str;
    }
}
