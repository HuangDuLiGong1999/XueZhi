package com.xuezhi.check_service.application;

import com.xuezhi.check_service.domain.entity.Verification;
import com.xuezhi.check_service.domain.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class VerificationApplication {
    private VerificationRepository verificationRepository;

    @Autowired
    public VerificationApplication(VerificationRepository verificationRepository){
        this.verificationRepository = verificationRepository;
    }

    public void addVerification(String userId, MultipartFile multipartFile){
        verificationRepository.addVerification(userId, multipartFile);
    }

    public List<Verification> getVerification(){
        return verificationRepository.getVerification();
    }

    public void deleteVerification(String id){
        verificationRepository.deleteVerification(id);
    }
}
