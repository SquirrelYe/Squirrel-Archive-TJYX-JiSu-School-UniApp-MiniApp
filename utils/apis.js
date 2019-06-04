const http = require('./req/index')
let req = http.req
export default  {
    test:{
        login(n, p) { return req.post('/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },
    },

    // 参赛者信息
    user: {
        delete(id) { return req.post('/ent/user', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/user', { 'judge': 3, 'id': id, 'condition': c }) },
        login(n, p) { return req.post('/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },
        creatAdmin(n, p, m, c, s) { return req.post('/ent/user', { 'judge': 1, 'name': n, 'pass': p, 'mail': m, 'phone': c, 'school_id': s, 'type': 1, 'condition': 0 }) },
		cusCreate(m,o,p,s) { return req.post('/ent/user', { 'judge': 7, 'phone':m, 'openid':o, 'pass': p ,'school_id': s}) },
		cusLogin(m, p) { return req.post('/ent/user', { 'judge': 8, 'phone':m, 'pass': p }) },

        findAndCountAll(o, l) { return req.post('/ass/user', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/user', { 'judge': 1, 'id': id }) },
        findOneByOpenid(o) { return req.post('/ass/user', { 'judge': 2, 'openid': o }) },
        findAndCountAllByTypeSchool(t, s, o, l) { return req.post('/ass/user', { 'judge': 3, 'type': t, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllXYDS(t, s, o, l) { return req.post('/ass/user', { 'judge': 6, 'type': t,'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllXYDSByNameSchool(t, s, n) { return req.post('/ass/user', { 'judge': 7, 'type': t,'school_id': s, 'name': n }) },
        findAndCountAllBySchool(s, o, l) { return req.post('/ass/user', { 'judge': 4, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllByTypeLikeByNameSchool(t, n, s) { return req.post('/ass/user', { 'judge': 5, 'name': n, 'type': t , 'school_id': s}) },
    },
    // 学校信息
    school: {
        findAndCountAll(o,l){ return req.post('/ent/school', { 'judge': 0, 'offset': o, 'limit': l }) },
        creat(n, d, p) { return req.post('/ent/school', { 'judge': 1, 'name': n, 'detail': d, 'province': p }) },
        delete(id) { return req.post('/ent/school', { 'judge': 2, 'id': id }) },
        update(id, n, d, p) { return req.post('/ent/school', { 'judge': 3, 'id': id, 'name': n, 'detail': d, 'province': p }) },
 
        findAndCountAllLikeByName(n) { return req.post('/ent/school', { 'judge':4, 'name': n }) },
        findAndCountAllOnlyName(n) { return req.post('/ent/school', { 'judge':5 }) },
    },
    // 认证信息
    authen: {
		creat(u,n,s,x,p,c,r) { return req.post('/ent/authen', { 'judge': 1, 'user_id': u,'name': n,'school_id':s,'xuehao':x,'phone':p,'card':c,'rz_icon':r }) },
        delete(id) { return req.post('/ent/authen', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/authen', { 'judge': 3, 'id': id, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/authen', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/authen', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.post('/ass/authen', { 'judge': 2, 'user_id': u }) },
        findAndCountAllBySchool(s, o, l) { return req.post('/ass/authen', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n,s) { return req.post('/ass/authen', { 'judge':4, 'name': n, 'school_id': s }) },
    },
    // 用户详细信息
    info: {
		creat(u,n,a,g,p,c,co){ return req.post('/ent/info', { 'judge': 1, 'user_id': u, 'nickName': n, 'avatarUrl': a, 'gender': g,'province': p,'city': c,'country': co}) },
        delete(id) { return req.post('/ent/info', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.post('/ass/info', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/info', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.post('/ass/info', { 'judge': 2, 'user_id': u }) },
    },
    // 地址信息
    location: {
        delete(id) { return req.post('/ent/location', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.post('/ass/location', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/location', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.post('/ass/location', { 'judge': 2, 'user_id': u }) },
    },
    // 开卡信息
    card: {
        create(u,c,n,m,p,s,d,de) { return req.post('/ent/card', { 'judge': 1, 'user_id': u, 'condition':c, 'name':n,'price':m, 'phone':p , 'school':s ,'dom':d,'detail':de}) },
        delete(id) { return req.post('/ent/card', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/card', { 'judge': 3, 'id': id, 'condition': c }) },
        setTaken(id, u, c) { return req.post('/ent/card', { 'judge': 3, 'id': id, 'user_id': u, 'condition': c }) },

        findAndCountAllBySchool(s, o, l) { return req.post('/ass/card', { 'judge': 0, 'school_id': s, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/card', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.post('/ass/card', { 'judge': 2, 'user_id': u }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/card', { 'judge': 3, 'name': n, 'school_id': s }) },
    },
    // 快递代取
    logistic: {
        delete(id) { return req.post('/ent/logistic', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/logistic', { 'judge': 3, 'id': id, 'condition': c }) },
        addTake(id, t, c) { return req.post('/ent/logistic', { 'judge': 3, 'id': id, 'take':t, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/logistic', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/logistic', { 'judge': 1, 'id': id }) },
        findOneByUser(u, o, l) { return req.post('/ass/logistic', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/logistic', { 'judge': 3, 'school_id': s, 'name': n }) },
        findAllBySchool(s, o, l) { return req.post('/ass/logistic', { 'judge': 4, 'school_id': s, 'offset': o, 'limit': l }) },
    },
    // 快递代发
    lsend: {
        delete(id) { return req.post('/ent/lsend', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/lsend', { 'judge': 3, 'id': id, 'condition': c }) },
        updateTake(id,t) { return req.post('/ent/lsend', { 'judge': 3, 'id': id, 'take': t }) },
        updateCode(id,code,c) { return req.post('/ent/lsend', { 'judge': 3, 'id': id, 'code': code, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/lsend', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/lsend', { 'judge': 1, 'id': id }) },
        findAllByUser(u, o, l) { return req.post('/ass/lsend', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/lsend', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByCusName(n,s,o,l) { return req.post('/ass/lsend', { 'judge': 4, 'name': n, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByTakName(n,s,o,l) { return req.post('/ass/lsend', { 'judge': 5, 'name': n , 'school_id': s, 'offset': o, 'limit': l}) },
    },
    // 快递订单信息
    order: {
        delete(id) { return req.post('/ent/order', { 'judge': 2, 'id': id }) },
        update(id, o, c) { return req.post('/ent/order', { 'judge': 3, 'id': id, 'other': o, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/order', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/order', { 'judge': 1, 'id': id }) },
        findOneByMe(m, o, l) { return req.post('/ass/order', { 'judge': 2, 'me': m, 'offset': o, 'limit': l }) },
        findOneByOther(o, off, l) { return req.post('/ass/order', { 'judge': 2, 'other': o, 'offset': off, 'limit': l }) },
    },
    // 考试一级菜单
    exam: {
        delete(id) { return req.post('/ent/exam', { 'judge': 2, 'id': id }) },
        creat(t, c, s) { return req.post('/ent/exam', { 'judge': 1, 'title': t, 'condition': c, 'school_id': s }) },
        update(id, t, c) { return req.post('/ent/exam', { 'judge': 3, 'id': id, 'title': t, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/exam', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/exam', { 'judge': 1, 'id': id }) },
        findAllBySchool(s, o, l) { return req.post('/ass/exam', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/exam', { 'judge': 2, 'name': n , 'school_id': s}) },
    },
    // 考试二级菜单
    mexam: {
        delete(id) { return req.post('/ent/mexam', { 'judge': 2, 'id': id }) },
        creat(e,t,c,s) { return req.post('/ent/mexam', { 'judge': 1, 'exam_id': e, 'title': t, 'condition': c, 'school_id': s }) },
        updateCondition(id, c) { return req.post('/ent/mexam', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id, e, t, c) { return req.post('/ent/mexam', { 'judge': 3, 'id': id, 'title': t, 'exam_id': e, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/mexam', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/mexam', { 'judge': 1, 'id': id }) },
        findOneByExamId(e, o, l) { return req.post('/ass/mexam', { 'judge': 2, 'exam_id': e, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/mexam', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/mexam', { 'judge': 4, 'title': n , 'school_id': s}) }
    },
    // 考试项目
    eitem: {
        delete(id) { return req.post('/ent/eitem', { 'judge': 2, 'id': id }) },
        creat(l, n, t, p, d, e, c, s) { return req.post('/ent/eitem', { 'judge': 1, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mexam_id': e, 'condition': c, 'school_id': s }) },
        updateCondition(id, c) { return req.post('/ent/eitem', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id,l, n, t, p, d, e, c) { return req.post('/ent/eitem', { 'judge': 3, 'id': id, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mexam_id': e, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/eitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/eitem', { 'judge': 1, 'id': id }) },
        findOneByMexamId(e, o, l) { return req.post('/ass/eitem', { 'judge': 2, 'mexam_id': e, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/eitem', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/eitem', { 'judge': 4, 'name': n , 'school_id': s}) }    
    },
    // 旅游一级菜单
    journey: {
        creat(t, c ,s) { return req.post('/ent/journey', { 'judge': 1, 'title': t, 'condition': c, 'school_id': s }) },
        delete(id) { return req.post('/ent/journey', { 'judge': 2, 'id': id }) },
        update(id, t, c) { return req.post('/ent/journey', { 'judge': 3, 'id': id, 'title': t, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/journey', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/journey', { 'judge': 1, 'id': id }) },
        findAllBySchool(s, o, l) { return req.post('/ass/journey', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/journey', { 'judge': 2, 'title': n , 'school_id': s}) }
    },
    // 旅游二级菜单
    mjourney: {
        delete(id) { return req.post('/ent/mjourney', { 'judge': 2, 'id': id }) },
        creat(e,t,c,s) { return req.post('/ent/mjourney', { 'judge': 1, 'journey_id': e, 'title': t, 'condition': c , 'school_id': s}) },
        updateCondition(id, c) { return req.post('/ent/mjourney', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id, e, t, c) { return req.post('/ent/mjourney', { 'judge': 3, 'id': id, 'title': t, 'journey_id': e, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/mjourney', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/mjourney', { 'judge': 1, 'id': id }) },
        findOneByJourneyId(e, o, l) { return req.post('/ass/mjourney', { 'judge': 2, 'journey_id': e, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/mjourney', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/mjourney', { 'judge': 4, 'title': n , 'school_id': s}) }
        },
    // 旅游项目
    jitem: {
        delete(id) { return req.post('/ent/jitem', { 'judge': 2, 'id': id }) },
        creat(l, n, t, p, d, j, c, s) { return req.post('/ent/jitem', { 'judge': 1, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mjourney_id': j, 'condition': c, 'school_id': s }) },
        updateCondition(id, c) { return req.post('/ent/jitem', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id,l, n, t, p, d, j, c) { return req.post('/ent/jitem', { 'judge': 3, 'id': id, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mjourney_id': j, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/jitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/jitem', { 'judge': 1, 'id': id }) },
        findByJourneyId(j, o, l) { return req.post('/ass/jitem', { 'judge': 2, 'mjourney_id': j, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/jitem', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/jitem', { 'judge': 4, 'name': n , 'school_id': s}) }    
    },
    // 水果一级菜单
    fruit: {
        creat(t, c, s) { return req.post('/ent/fruit', { 'judge': 1, 'title': t, 'condition': c, 'school_id': s }) },
        delete(id) { return req.post('/ent/fruit', { 'judge': 2, 'id': id }) },
        update(id, t, c) { return req.post('/ent/fruit', { 'judge': 3, 'id': id, 'title': t, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/fruit', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/fruit', { 'judge': 1, 'id': id }) },
        findAllBySchool(s, o, l) { return req.post('/ass/fruit', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/fruit', { 'judge': 2, 'title': n , 'school_id': s}) }
    },
    // 水果二级菜单
    mfruit: {
        delete(id) { return req.post('/ent/mfruit', { 'judge': 2, 'id': id }) },
        creat(e,t,c,s) { return req.post('/ent/mfruit', { 'judge': 1, 'fruit_id': e, 'title': t, 'condition': c, 'school_id': s }) },
        updateCondition(id, c) { return req.post('/ent/mfruit', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id, e, t, c) { return req.post('/ent/mfruit', { 'judge': 3, 'id': id, 'title': t, 'fruit_id': e, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/mfruit', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/mfruit', { 'judge': 1, 'id': id }) },
        findOneByJourneyId(e, o, l) { return req.post('/ass/mfruit', { 'judge': 2, 'fruit_id': e, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/mfruit', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/mfruit', { 'judge': 4, 'title': n , 'school_id': s}) }
    },
    // 水果项目
    fitem: {
        delete(id) { return req.post('/ent/fitem', { 'judge': 2, 'id': id }) },
        creat(l, n, t, p, d, j, c, s) { return req.post('/ent/fitem', { 'judge': 1, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mfruit_id': j, 'condition': c, 'school_id': s }) },
        updateCondition(id, c) { return req.post('/ent/fitem', { 'judge': 3, 'id': id, 'condition': c }) },
        update(id,l, n, t, p, d, j, c) { return req.post('/ent/fitem', { 'judge': 3, 'id': id, 'logo': l, 'name': n, 'title': t, 'price': p, 'detail': d, 'mfruit_id': j, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/fitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/fitem', { 'judge': 1, 'id': id }) },
        findByFruitId(f, o, l) { return req.post('/ass/fitem', { 'judge': 2, 'mfruit_id': f, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/fitem', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/fitem', { 'judge': 4, 'name': n , 'school_id': s}) }  
    },
    // 购物车
    cart: {
        delete(id) { return req.post('/ent/cart', { 'judge': 2, 'id': id }) },
        updateJudge(id , j) { return req.post('/ent/cart', { 'judge': 3, 'id': id,'judgec':j }) },

        findAndCountAll(o, l) { return req.post('/ass/cart', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/cart', { 'judge': 1, 'id': id }) },
        findByUserId(u, o, l) { return req.post('/ass/cart', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findByExam(e, o, l) { return req.post('/ass/cart', { 'judge': 3, 'eitem_id': e, 'offset': o, 'limit': l }) },
        findByJourney(j, o, l) { return req.post('/ass/cart', { 'judge': 4, 'jitem_id': j, 'offset': o, 'limit': l }) },
        findByFruit(f, o, l) { return req.post('/ass/cart', { 'judge': 5, 'fitem_id': f, 'offset': o, 'limit': l }) },
    },
    // 总订单交易
    tran: {
        delete(id) { return req.post('/ent/tran', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.post('/ass/tran', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/tran', { 'judge': 1, 'id': id }) },
        findByUserId(u, o, l) { return req.post('/ass/tran', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findByExam(e, o, l) { return req.post('/ass/tran', { 'judge': 3, 'eitem_id': e, 'offset': o, 'limit': l }) },
        findByJourney(j, o, l) { return req.post('/ass/tran', { 'judge': 4, 'jitem_id': j, 'offset': o, 'limit': l }) },
        findByFruit(f, o, l) { return req.post('/ass/tran', { 'judge': 5, 'fitem_id': f, 'offset': o, 'limit': l }) },
    },
    // 资金信息
    stock: {
        delete(id) { return req.post('/ent/stock', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.post('/ass/stock', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/stock', { 'judge': 1, 'id': id }) },
        findByUserId(u) { return req.post('/ass/stock', { 'judge': 2, 'user_id': u }) },
    },
    // 提现
    tixian: {
        delete(id) { return req.post('/ent/tixian', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/tixian', { 'judge': 3, 'id': id, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/tixian', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/tixian', { 'judge': 1, 'id': id }) },
        findAllByUser(u, o, l) { return req.post('/ass/tixian', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findAllBySchool(s, o, l) { return req.post('/ass/tixian', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByUserNameSchool(n, s, o, l) { return req.post('/ass/tixian', { 'judge': 4, 'name': n, 'school_id': s, 'offset': o, 'limit': l }) },
    },
    // 活动
    activity: {
        findAllBySchool(s, o, l) { return req.post('/ent/activity', { 'judge': 0, 'school_id': s, 'offset': o, 'limit': l }) },
        create(t,ti,i,d,c,s) { return req.post('/ent/activity', { 'judge': 1, 'type': t, 'title': ti, 'icon': i,'detail': d,'condition': c,'school_id': s }) },
        delete(id) { return req.post('/ent/activity', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/activity', { 'judge': 3, 'id': id, 'condition': c }) },
        findAndCountAllLikeByTitleSchool(t,s) { return req.post('/ent/activity', { 'judge': 4, 'title': t, 'school_id': s }) },
    },

}