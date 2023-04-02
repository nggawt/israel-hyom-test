<?php

if (!function_exists('to_boolean')) {
    
     /**
      * Convert to boolean
      *
      * @param $booleable
      * @return boolean
      */
     function to_boolean($booleable)
     {
         return filter_var($booleable, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
     }
 }

