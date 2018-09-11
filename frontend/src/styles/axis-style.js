import { injectGlobal } from "styled-components";

injectGlobal`

.axis path{
    stroke:#ddd;
    stroke-dasharray:1 1
}

.tooltip-content{
    background:hsla(0,0%,100%,.85);
    border:1px double #ddd;
    padding:10px 20px
}
.annotation-y-line{
    stroke:purple;
    stroke-width:1px;
    stroke-dasharray:10 10
}

.divided-line-xy .xscale .tick>line{
    stroke-opacity:0
}
.divided-line-xy .yscale .tick>line{
    stroke:#00a2ce;
    stroke-opacity:.5
}
.divided-line-or .yscale .tick>line{
    stroke:#b3331d;
    stroke-opacity:.5
}
.divided-line-xy .yscale .tick>text{
    fill:#00a2ce;
    fill-opacity:.5
}
.divided-line-or .yscale .tick>text{
    fill:#b3331d;
    fill-opacity:.5
}
.annotation-network-label .tooltip-content,.annotation-xy-label .tooltip-content{
    position:relative;
    -webkit-transform:translate(calc(-50% + 7px),calc(-100% - 20px));
    -ms-transform:translate(calc(-50% + 7px),calc(-100% - 20px));
    transform:translate(calc(-50% + 7px),calc(-100% - 20px))
}
.annotation-network-label .tooltip-content:before,.annotation-xy-label .tooltip-content:before{
    border-right:inherit;
    border-bottom:inherit;
    bottom:-8px;
    left:calc(50% - 15px)
}
.tooltip-content{
    background:#fff;
    border:1px solid #000;
    color:#000;
    padding:10px;
    z-index:999999;
    min-width:120px
}
.tooltip-content:before{
    background:inherit;
    content:"";
    padding:0;
    -webkit-transform:rotate(45deg);
    -ms-transform:rotate(45deg);
    transform:rotate(45deg);
    width:15px;
    height:15px;
    position:absolute;
    z-index:99
}
.annotation-or-label.horizontal .tooltip-content{
    -webkit-transform:translateY(-50%);
    -ms-transform:translateY(-50%);
    transform:translateY(-50%);
    position:relative;
    left:20px
}
.annotation-or-label.horizontal .tooltip-content:before{
    top:calc(50% - 9px);
    left:-9px;
    border-left:inherit;
    border-bottom:inherit
}
.annotation-or-label.vertical .tooltip-content{
    position:relative;
    -webkit-transform:translate(-50%,calc(-100% - 20px));
    -ms-transform:translate(-50%,calc(-100% - 20px));
    transform:translate(-50%,calc(-100% - 20px))
}
.annotation-or-label.vertical .tooltip-content:before{
    bottom:-10px;
    left:calc(50% - 9px);
    border-right:inherit;
    border-bottom:inherit
}
`;
