<?php

namespace App\Enums;

enum AnalysisType: string
{
    case RISK = 'risk';
    case OPPORTUNITY = 'opportunity';
    case SOLUTION = 'solution';
    case INVESTMENT = 'investment';
}
