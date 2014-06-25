start
  = expression

selector
  = left:fieldname "=" right:value {
      return { type: 'selector', dimension: left, value: right }
    }
  / left:fieldname "~" right:value {
    return { type: 'regex', dimension: left, pattern: right }
  }

and_operator
  = 'and' 
  / '&&' { return 'and'; }

or_operator
  = 'or'
  / '||' { return 'or'; }

fieldname
  = unquoted_term

value
  = unquoted_term
  / quoted_term

and_expression
  = left:primary_expression right:(__ and_operator __ primary_expression)* {
      return right.length == 0 ? left :
          { type: 'and', fields: [left].concat(right.map(function(x){return x[3];})) };
    }

expression
  = left:and_expression right:(__ operator:or_operator __ and_expression)* {
      return right.length == 0 ? left :
          { type: 'or' , fields: [left].concat(right.map(function(x){return x[3];})) };
    }

primary_expression
  = "(" __ expression:expression __ ")" { return expression; }
  / selector
    
unquoted_term
  = term:term_char+
    { 
        return term.join('');
    }

term_char
  = '.' / [^: \t\r\n\f\{\}()"+-/^~\[\]=]
    
quoted_term
  = '"' term:[^"]+ '"'
    {
        return term.join('');
    }

whitespace
  = [ \t\r\n\f]

__ =
  whitespace*

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
