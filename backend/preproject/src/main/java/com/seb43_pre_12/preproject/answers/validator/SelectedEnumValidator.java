package com.seb43_pre_12.preproject.answers.validator;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

//public class SelectedEnumValidator implements ConstraintValidator<SelectedEnum, Enum> {
//    @Override
//    public void initialize(SelectedEnum constraintAnnotation) {
//        ConstraintValidator.super.initialize(constraintAnnotation);
//    }
//
//    @Override
//    public boolean isValid(Enum value, ConstraintValidatorContext context) {
//        if(value == Answer.Selected.ANSWER_NOT_SELECTED || value == Answer.Selected.ANSWER_SELECTED
//                || value ==null) return true;
//        else return false;
//    }
//}
public class SelectedEnumValidator implements ConstraintValidator<SelectedEnum, Enum<?>> {
    private Pattern pattern;

    @Override
    public void initialize(SelectedEnum annotation) {
        try {
            pattern = Pattern.compile(annotation.regexp());
        } catch (PatternSyntaxException e) {
            throw new IllegalArgumentException("pattern regex is invalid", e);
        }
    }

    @Override
    public boolean isValid(Enum<?> value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        Matcher m = pattern.matcher(value.name());
        return m.matches();
    }
}