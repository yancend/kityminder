var MinderEvent = kity.createClass( 'MindEvent', {
    constructor: function ( type, params, canstop ) {
        params = params || {};
        if ( params.getType && params.getType() == 'ShapeEvent' ) {
            this.kityEvent = params;
            this.getPosition = params.getPosition.bind( params );
        } else {
            kity.Utils.extend( this, params );
        }
        this.type = type;
        this._canstop = canstop || false;
        if ( params.targetShape ) {
            this.getTargetNode = function () {
                var findShape = params.targetShape;
                while ( !findShape.minderNode && findShape.container ) {
                    findShape = findShape.container;
                }
                return findShape.minderNode || null;
            };
        }
    },

    stopPropagation: function () {
        this._stoped = true;
    },

    stopPropagationImmediately: function () {
        this._immediatelyStoped = true;
        this._stoped = true;
    },

    shouldStopPropagation: function () {
        return this._canstop && this._stoped;
    },

    shouldStopPropagationImmediately: function () {
        return this._canstop && this._immediatelyStoped;
    }
} );