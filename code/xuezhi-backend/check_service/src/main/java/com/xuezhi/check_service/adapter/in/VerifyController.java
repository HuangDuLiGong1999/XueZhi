package com.xuezhi.check_service.adapter.in;

import com.xuezhi.check_service.application.VerificationApplication;
import com.xuezhi.check_service.domain.entity.Verification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/verification")
public class VerifyController {
    private VerificationApplication verificationApplication;

    @Autowired
    public VerifyController(VerificationApplication verificationApplication){
        this.verificationApplication = verificationApplication;
    }

    @PostMapping
    public void addVerification(@RequestParam String userId, @RequestParam MultipartFile multipartFile){
        verificationApplication.addVerification(userId, multipartFile);
    }

    @GetMapping
    public List<Verification> getVerification(){
        return verificationApplication.getVerification();
    }

    @DeleteMapping
    public void deleteVerification(@RequestParam String id){
        verificationApplication.deleteVerification(id);
    }
}
