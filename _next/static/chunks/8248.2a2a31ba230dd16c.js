"use strict";(globalThis.webpackChunk_N_E=globalThis.webpackChunk_N_E||[]).push([[8248,4657,7144],{64657:(e,a,r)=>{r.r(a),r.d(a,{default:()=>o});var n=r(52192);let t=Object.freeze({displayName:"GLSL",fileTypes:["vs","fs","gs","vsh","fsh","gsh","vshader","fshader","gshader","vert","frag","geom","f.glsl","v.glsl","g.glsl"],foldingStartMarker:"/\\*\\*|\\{\\s*$",foldingStopMarker:"\\*\\*/|^\\s*\\}",name:"glsl",patterns:[{match:"\\b(break|case|continue|default|discard|do|else|for|if|return|switch|while)\\b",name:"keyword.control.glsl"},{match:"\\b(void|bool|int|uint|float|vec2|vec3|vec4|bvec2|bvec3|bvec4|ivec2|ivec2|ivec3|uvec2|uvec2|uvec3|mat2|mat3|mat4|mat2x2|mat2x3|mat2x4|mat3x2|mat3x3|mat3x4|mat4x2|mat4x3|mat4x4|sampler[1|2|3]D|samplerCube|sampler2DRect|sampler[1|2]DShadow|sampler2DRectShadow|sampler[1|2]DArray|sampler[1|2]DArrayShadow|samplerBuffer|sampler2DMS|sampler2DMSArray|struct|isampler[1|2|3]D|isamplerCube|isampler2DRect|isampler[1|2]DArray|isamplerBuffer|isampler2DMS|isampler2DMSArray|usampler[1|2|3]D|usamplerCube|usampler2DRect|usampler[1|2]DArray|usamplerBuffer|usampler2DMS|usampler2DMSArray)\\b",name:"storage.type.glsl"},{match:"\\b(attribute|centroid|const|flat|in|inout|invariant|noperspective|out|smooth|uniform|varying)\\b",name:"storage.modifier.glsl"},{match:"\\b(gl_BackColor|gl_BackLightModelProduct|gl_BackLightProduct|gl_BackMaterial|gl_BackSecondaryColor|gl_ClipDistance|gl_ClipPlane|gl_ClipVertex|gl_Color|gl_DepthRange|gl_DepthRangeParameters|gl_EyePlaneQ|gl_EyePlaneR|gl_EyePlaneS|gl_EyePlaneT|gl_Fog|gl_FogCoord|gl_FogFragCoord|gl_FogParameters|gl_FragColor|gl_FragCoord|gl_FragDat|gl_FragDept|gl_FrontColor|gl_FrontFacing|gl_FrontLightModelProduct|gl_FrontLightProduct|gl_FrontMaterial|gl_FrontSecondaryColor|gl_InstanceID|gl_Layer|gl_LightModel|gl_LightModelParameters|gl_LightModelProducts|gl_LightProducts|gl_LightSource|gl_LightSourceParameters|gl_MaterialParameters|gl_ModelViewMatrix|gl_ModelViewMatrixInverse|gl_ModelViewMatrixInverseTranspose|gl_ModelViewMatrixTranspose|gl_ModelViewProjectionMatrix|gl_ModelViewProjectionMatrixInverse|gl_ModelViewProjectionMatrixInverseTranspose|gl_ModelViewProjectionMatrixTranspose|gl_MultiTexCoord[0-7]|gl_Normal|gl_NormalMatrix|gl_NormalScale|gl_ObjectPlaneQ|gl_ObjectPlaneR|gl_ObjectPlaneS|gl_ObjectPlaneT|gl_Point|gl_PointCoord|gl_PointParameters|gl_PointSize|gl_Position|gl_PrimitiveIDIn|gl_ProjectionMatrix|gl_ProjectionMatrixInverse|gl_ProjectionMatrixInverseTranspose|gl_ProjectionMatrixTranspose|gl_SecondaryColor|gl_TexCoord|gl_TextureEnvColor|gl_TextureMatrix|gl_TextureMatrixInverse|gl_TextureMatrixInverseTranspose|gl_TextureMatrixTranspose|gl_Vertex|gl_VertexIDh)\\b",name:"support.variable.glsl"},{match:"\\b(gl_MaxClipPlanes|gl_MaxCombinedTextureImageUnits|gl_MaxDrawBuffers|gl_MaxFragmentUniformComponents|gl_MaxLights|gl_MaxTextureCoords|gl_MaxTextureImageUnits|gl_MaxTextureUnits|gl_MaxVaryingFloats|gl_MaxVertexAttribs|gl_MaxVertexTextureImageUnits|gl_MaxVertexUniformComponents)\\b",name:"support.constant.glsl"},{match:"\\b(abs|acos|all|any|asin|atan|ceil|clamp|cos|cross|degrees|dFdx|dFdy|distance|dot|equal|exp|exp2|faceforward|floor|fract|ftransform|fwidth|greaterThan|greaterThanEqual|inversesqrt|length|lessThan|lessThanEqual|log|log2|matrixCompMult|max|min|mix|mod|noise[1-4]|normalize|not|notEqual|outerProduct|pow|radians|reflect|refract|shadow1D|shadow1DLod|shadow1DProj|shadow1DProjLod|shadow2D|shadow2DLod|shadow2DProj|shadow2DProjLod|sign|sin|smoothstep|sqrt|step|tan|texture1D|texture1DLod|texture1DProj|texture1DProjLod|texture2D|texture2DLod|texture2DProj|texture2DProjLod|texture3D|texture3DLod|texture3DProj|texture3DProjLod|textureCube|textureCubeLod|transpose)\\b",name:"support.function.glsl"},{match:"\\b(asm|double|enum|extern|goto|inline|long|short|sizeof|static|typedef|union|unsigned|volatile)\\b",name:"invalid.illegal.glsl"},{include:"source.c"}],scopeName:"source.glsl",embeddedLangs:["c"]});var o=[...n.default,t]},67144:(e,a,r)=>{r.r(a),r.d(a,{default:()=>n});var n=[Object.freeze({displayName:"RegExp",fileTypes:["re"],name:"regexp",patterns:[{include:"#regexp-expression"}],repository:{codetags:{captures:{1:{name:"keyword.codetag.notation.python"}},match:"(?:\\b(NOTE|XXX|HACK|FIXME|BUG|TODO)\\b)"},"fregexp-base-expression":{patterns:[{include:"#fregexp-quantifier"},{include:"#fstring-formatting-braces"},{match:"\\{.*?\\}"},{include:"#regexp-base-common"}]},"fregexp-quantifier":{match:"\\{\\{(\\d+|\\d+,(\\d+)?|,\\d+)\\}\\}",name:"keyword.operator.quantifier.regexp"},"fstring-formatting-braces":{patterns:[{captures:{1:{name:"constant.character.format.placeholder.other.python"},2:{name:"invalid.illegal.brace.python"},3:{name:"constant.character.format.placeholder.other.python"}},comment:"empty braces are illegal",match:"({)(\\s*?)(})"},{match:"({{|}})",name:"constant.character.escape.python"}]},"regexp-backreference":{captures:{1:{name:"support.other.parenthesis.regexp punctuation.parenthesis.backreference.named.begin.regexp"},2:{name:"entity.name.tag.named.backreference.regexp"},3:{name:"support.other.parenthesis.regexp punctuation.parenthesis.backreference.named.end.regexp"}},match:"(\\()(\\?P=\\w+(?:\\s+[0-9A-Za-z]+)?)(\\))",name:"meta.backreference.named.regexp"},"regexp-backreference-number":{captures:{1:{name:"entity.name.tag.backreference.regexp"}},match:"(\\\\[1-9]\\d?)",name:"meta.backreference.regexp"},"regexp-base-common":{patterns:[{match:"\\.",name:"support.other.match.any.regexp"},{match:"\\^",name:"support.other.match.begin.regexp"},{match:"\\$",name:"support.other.match.end.regexp"},{match:"[+*?]\\??",name:"keyword.operator.quantifier.regexp"},{match:"\\|",name:"keyword.operator.disjunction.regexp"},{include:"#regexp-escape-sequence"}]},"regexp-base-expression":{patterns:[{include:"#regexp-quantifier"},{include:"#regexp-base-common"}]},"regexp-character-set":{patterns:[{match:"\\[\\^?\\](?!.*?\\])"},{begin:"(\\[)(\\^)?(\\])?",beginCaptures:{1:{name:"punctuation.character.set.begin.regexp constant.other.set.regexp"},2:{name:"keyword.operator.negation.regexp"},3:{name:"constant.character.set.regexp"}},end:"(\\])",endCaptures:{1:{name:"punctuation.character.set.end.regexp constant.other.set.regexp"},2:{name:"invalid.illegal.newline.python"}},name:"meta.character.set.regexp",patterns:[{include:"#regexp-charecter-set-escapes"},{match:"[^\\n]",name:"constant.character.set.regexp"}]}]},"regexp-charecter-set-escapes":{patterns:[{match:"\\\\[abfnrtv\\\\]",name:"constant.character.escape.regexp"},{include:"#regexp-escape-special"},{match:"\\\\([0-7]{1,3})",name:"constant.character.escape.regexp"},{include:"#regexp-escape-character"},{include:"#regexp-escape-unicode"},{include:"#regexp-escape-catchall"}]},"regexp-comments":{begin:"\\(\\?#",beginCaptures:{0:{name:"punctuation.comment.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"punctuation.comment.end.regexp"},2:{name:"invalid.illegal.newline.python"}},name:"comment.regexp",patterns:[{include:"#codetags"}]},"regexp-conditional":{begin:"(\\()\\?\\((\\w+(?:\\s+[0-9A-Za-z]+)?|\\d+)\\)",beginCaptures:{0:{name:"keyword.operator.conditional.regexp"},1:{name:"punctuation.parenthesis.conditional.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"keyword.operator.conditional.negative.regexp punctuation.parenthesis.conditional.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-escape-catchall":{match:"\\\\(.|\\n)",name:"constant.character.escape.regexp"},"regexp-escape-character":{match:"\\\\(x[0-9A-Fa-f]{2}|0[0-7]{1,2}|[0-7]{3})",name:"constant.character.escape.regexp"},"regexp-escape-sequence":{patterns:[{include:"#regexp-escape-special"},{include:"#regexp-escape-character"},{include:"#regexp-escape-unicode"},{include:"#regexp-backreference-number"},{include:"#regexp-escape-catchall"}]},"regexp-escape-special":{match:"\\\\([AbBdDsSwWZ])",name:"support.other.escape.special.regexp"},"regexp-escape-unicode":{match:"\\\\(u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})",name:"constant.character.unicode.regexp"},"regexp-expression":{patterns:[{include:"#regexp-base-expression"},{include:"#regexp-character-set"},{include:"#regexp-comments"},{include:"#regexp-flags"},{include:"#regexp-named-group"},{include:"#regexp-backreference"},{include:"#regexp-lookahead"},{include:"#regexp-lookahead-negative"},{include:"#regexp-lookbehind"},{include:"#regexp-lookbehind-negative"},{include:"#regexp-conditional"},{include:"#regexp-parentheses-non-capturing"},{include:"#regexp-parentheses"}]},"regexp-flags":{match:"\\(\\?[aiLmsux]+\\)",name:"storage.modifier.flag.regexp"},"regexp-lookahead":{begin:"(\\()\\?=",beginCaptures:{0:{name:"keyword.operator.lookahead.regexp"},1:{name:"punctuation.parenthesis.lookahead.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"keyword.operator.lookahead.regexp punctuation.parenthesis.lookahead.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-lookahead-negative":{begin:"(\\()\\?!",beginCaptures:{0:{name:"keyword.operator.lookahead.negative.regexp"},1:{name:"punctuation.parenthesis.lookahead.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"keyword.operator.lookahead.negative.regexp punctuation.parenthesis.lookahead.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-lookbehind":{begin:"(\\()\\?<=",beginCaptures:{0:{name:"keyword.operator.lookbehind.regexp"},1:{name:"punctuation.parenthesis.lookbehind.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"keyword.operator.lookbehind.regexp punctuation.parenthesis.lookbehind.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-lookbehind-negative":{begin:"(\\()\\?<!",beginCaptures:{0:{name:"keyword.operator.lookbehind.negative.regexp"},1:{name:"punctuation.parenthesis.lookbehind.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"keyword.operator.lookbehind.negative.regexp punctuation.parenthesis.lookbehind.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-named-group":{begin:"(\\()(\\?P<\\w+(?:\\s+[0-9A-Za-z]+)?>)",beginCaptures:{1:{name:"support.other.parenthesis.regexp punctuation.parenthesis.named.begin.regexp"},2:{name:"entity.name.tag.named.group.regexp"}},end:"(\\))",endCaptures:{1:{name:"support.other.parenthesis.regexp punctuation.parenthesis.named.end.regexp"},2:{name:"invalid.illegal.newline.python"}},name:"meta.named.regexp",patterns:[{include:"#regexp-expression"}]},"regexp-parentheses":{begin:"\\(",beginCaptures:{0:{name:"support.other.parenthesis.regexp punctuation.parenthesis.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"support.other.parenthesis.regexp punctuation.parenthesis.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-parentheses-non-capturing":{begin:"\\(\\?:",beginCaptures:{0:{name:"support.other.parenthesis.regexp punctuation.parenthesis.non-capturing.begin.regexp"}},end:"(\\))",endCaptures:{1:{name:"support.other.parenthesis.regexp punctuation.parenthesis.non-capturing.end.regexp"},2:{name:"invalid.illegal.newline.python"}},patterns:[{include:"#regexp-expression"}]},"regexp-quantifier":{match:"\\{(\\d+|\\d+,(\\d+)?|,\\d+)\\}",name:"keyword.operator.quantifier.regexp"}},scopeName:"source.regexp.python",aliases:["regex"]})]}}]);
//# sourceMappingURL=8248.2a2a31ba230dd16c.js.map