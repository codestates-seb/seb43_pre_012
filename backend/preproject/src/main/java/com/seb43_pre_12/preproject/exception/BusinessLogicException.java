package com.seb43_pre_12.preproject.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}

