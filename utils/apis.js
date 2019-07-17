
const http = require('./req/index')
let req = http.req
export default  {
    test:{
        login(n, p) { return req.post('/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },
    },
	// 首页加载
	index:{
		findAndCountAllBySchool(sid) { return req.post('/ass/index', { 'judge': 0, 'school_id': sid }) },
		findById(id) { return req.post('/ass/index', { 'judge': 1, 'id': id }) },
	},
    // 参赛者信息
    user: {
        delete(id) { return req.post('/ent/user', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/user', { 'judge': 3, 'id': id, 'condition': c }) },
        login(n, p) { return req.post('/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },
        creatAdmin(n, p, m, c, s) { return req.post('/ent/user', { 'judge': 1, 'name': n, 'pass': p, 'mail': m, 'phone': c, 'school_id': s, 'type': 1, 'condition': 0 }) },
		cusCreate(m,o,n,p,s) { return req.post('/ent/user', { 'judge': 7, 'phone':m, 'openid':o, 'name':n, 'pass': p ,'school_id': s}) },
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
		create(u,n,p,s,d,de) { return req.post('/ent/location', { 'judge': 1, 'user_id': u,'name':n,'phone':p,'school':s,'dom':d,'detail':de }) },
        delete(id) { return req.post('/ent/location', { 'judge': 2, 'id': id }) },
		update(id,n,p,s,d) { return req.post('/ent/location', { 'judge': 3,'id':id,'name':n,'phone':p,'school':s,'dom':d }) },

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
		create(u,f,l,t,m,i,k,s) { return req.post('/ent/logistic', { 'judge': 1, 'user_id': u, 'from':f, 'location_id':l, 'total':t , 'money':m , 'icon':i ,'key':k,'school_id':s }) },
        delete(id) { return req.post('/ent/logistic', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/logistic', { 'judge': 3, 'id': id, 'condition': c }) },
        addTake(id, t, c) { return req.post('/ent/logistic', { 'judge': 3, 'id': id, 'take':t, 'condition': c }) },

        findAndCountAll(o, l) { return req.post('/ass/logistic', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/logistic', { 'judge': 1, 'id': id }) },
        findOneByUser(u, o, l) { return req.post('/ass/logistic', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByNameSchool(n, s) { return req.post('/ass/logistic', { 'judge': 3, 'school_id': s, 'name': n }) },
        findAllBySchool(s, o, l) { return req.post('/ass/logistic', { 'judge': 4, 'school_id': s, 'offset': o, 'limit': l }) },
        findAllBySchoolCondition(s, c, o, l) { return req.post('/ass/logistic', { 'judge': 5, 'school_id': s,'condition': c, 'offset': o, 'limit': l }) },
    },
    // 快递代发
    lsend: {
		create(u,l,c,n,p,a,s) { return req.post('/ent/lsend', { 'judge': 1, 'user_id': u,'location_id': l,'condition': c,'name': n,'phone': p,'arrive': a,'school_id': s }) },
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
		createLog(u,t,n,p,log,c,loc,j) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'logistic_id': log, 'condition': c, 'location_id': loc,'other':"E校拼-快递带取",'judgec': j }) },
		createLsend(u,t,n,ls,c,loc,j) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'lsend_id': ls, 'condition': c, 'location_id': loc,'other':"E校拼-快递带发",'judgec': j }) },
		// 下面三 可以使用优惠券
 		createExam(u,t,n,p,e,c,loc,o,j,tic) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'eitem_id': e, 'condition': c, 'location_id': loc,'other':o,'judgec': j,'ticket_id':tic }) },
 		createJourney(u,t,n,p,ji,c,loc,o,j,tic) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'jitem_id': ji, 'condition': c, 'location_id': loc,'other':o,'judgec': j,'ticket_id':tic }) },
 		createFruit(u,t,n,p,f,c,loc,o,j,tic) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'fitem_id': f, 'condition': c, 'location_id': loc,'other':o,'judgec': j,'ticket_id':tic }) },
		
		createExamCart(u,t,n,p,e,c,j) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'eitem_id': e, 'condition': c,'judgec': j }) },
 		createJourneyCart(u,t,n,p,ji,c,j) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'jitem_id': ji, 'condition': c,'judgec': j }) },
 		createFruitCart(u,t,n,p,f,c,j) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': t, 'number': n ,'price':p ,'fitem_id': f, 'condition': c,'judgec': j }) },
 		createStockCart(u,p,o) { return req.post('/ent/cart', { 'judge':1, 'user_id': u, 'type': -4, 'number': 1 ,'price':p ,'fitem_id': f, 'other':o, 'condition': 1,'judgec': 2 }) },

        createCallback(id , j, c) { return req.post('/ent/cart', { 'judge': 3, 'id': id,'judgec':j,'callback':c }) },
		
		delete(id) { return req.post('/ent/cart', { 'judge': 2, 'id': id }) },
        updateCondition(id ,c) { return req.post('/ent/cart', { 'judge': 3, 'id': id,'condition':c }) },
        updateJudge(id , j) { return req.post('/ent/cart', { 'judge': 3, 'id': id,'judgec':j }) },
        updateCart(id,n,loc,o,c,j,tic) { return req.post('/ent/cart', { 'judge': 3, 'id':id,'number':n,'location_id':loc,'other':o,'condition':c,'judgec':j,'ticket_id':tic }) },
		updateTimeTrade(id,ts,tid) { return req.post('/ent/cart', { 'judge': 3, 'id': id,'timestamp':ts,'trade_id':tid }) },

        findAndCountAll(o, l) { return req.post('/ass/cart', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.post('/ass/cart', { 'judge': 1, 'id': id }) },
        findTranByUserId(u, o, l) { return req.post('/ass/cart', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findCartByUserId(u, o, l) { return req.post('/ass/cart', { 'judge': 7, 'user_id': u, 'offset': o, 'limit': l }) },
        findByExam(e, o, l) { return req.post('/ass/cart', { 'judge': 3, 'eitem_id': e, 'offset': o, 'limit': l }) },
        findByJourney(j, o, l) { return req.post('/ass/cart', { 'judge': 4, 'jitem_id': j, 'offset': o, 'limit': l }) },
        findByFruit(f, o, l) { return req.post('/ass/cart', { 'judge': 5, 'fitem_id': f, 'offset': o, 'limit': l }) },
        findByCondition(u, c, o, l) { return req.post('/ass/cart', { 'judge': 6, 'user_id': u,'judgec': c, 'offset': o, 'limit': l }) },
		
		findExamCallBack(eid,o,l) { return req.post('/ass/cart', { 'judge': 8, 'eitem_id': eid, 'offset': o, 'limit': l }) },
		findJourneyCallBack(jid,o,l) { return req.post('/ass/cart', { 'judge': 9, 'jitem_id': jid, 'offset': o, 'limit': l }) },
		findFruitCallBack(fid,o,l) { return req.post('/ass/cart', { 'judge': 10, 'fitem_id': fid, 'offset': o, 'limit': l }) },
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
		create(u,m,s,c) { return req.post('/ent/stock', { 'judge': 1, 'user_id': u, 'money':m, 'score':s, 'condition':c }) },
        delete(id) { return req.post('/ent/stock', { 'judge': 2, 'id': id }) },
		updateMoneyScore(id,m,s) { return req.post('/ent/stock', { 'judge': 3, 'id': id, 'money': m, 'score':s }) },

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
        create(t,ti,i,d,c,s) { return req.post('/ent/activity', { 'judge': 1, 'type': t, 'title': ti, 'icon': i,'detail': d,'condition': c,'school_id': s }) },
        delete(id) { return req.post('/ent/activity', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/activity', { 'judge': 3, 'id': id, 'condition': c }) },
        findAndCountAllLikeByTitleSchool(t,s) { return req.post('/ent/activity', { 'judge': 4, 'title': t, 'school_id': s }) },
        findAllBySchoolType(s, t, o, l) { return req.post('/ent/activity', { 'judge': 5, 'school_id': s, 'type':t, 'offset': o, 'limit': l }) },
    },
	// 收藏
	favorite:{
		createExam(t,e,u) { return req.post('/ent/favorite', { 'judge': 1, 'type': t, 'eitem_id': e, 'user_id': u }) },
		createJourney(t,e,u) { return req.post('/ent/favorite', { 'judge': 1, 'type': t, 'jitem_id': e, 'user_id': u }) },
		createFruit(t,e,u) { return req.post('/ent/favorite', { 'judge': 1, 'type': t, 'fitem_id': e, 'user_id': u }) },
        delete(id) { return req.post('/ent/favorite', { 'judge': 2, 'id': id }) },
		
        findAndCountAllByUser(u) { return req.post('/ass/favorite', { 'judge': 0, 'user_id': u }) },
		findExam(uid,eid) { return req.post('/ass/favorite', { 'judge': 1, 'eitem_id': eid, 'user_id': uid }) },
		findJourney(uid,jid) { return req.post('/ass/favorite', { 'judge': 2, 'jitem_id': jid, 'user_id': uid }) },
		findFruit(uid,fid) { return req.post('/ass/favorite', { 'judge': 3, 'fitem_id': fid, 'user_id': uid }) },
	},
	// 优惠券
	uticket:{
		findOneBySchoolConditionType(sid,condition,type) { return req.post('/ent/ticket', { 'judge': 4, 'school_id': sid, 'condition': condition,'type':type }) },
		
		create(u,t,c) { return req.post('/ent/user_ticket', { 'judge': 1, 'user_id': u, 'ticket_id': t,'condition': c }) },
        delete(id) { return req.post('/ent/user_ticket', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.post('/ent/user_ticket', { 'judge': 3, 'id': id, 'condition': c }) },
		// 新用户优惠券赠送 数量定义在后台 user_ticket 默认为 3		
		newerGetTicket(uid,tid,c) { return req.post('/ent/user_ticket', { 'judge': 4, 'user_id': uid, 'ticket_id': tid, 'condition': c }) },
		
		findAndCountAllByUser(uid,o,l) { return req.post('/ass/user_ticket', { 'judge': 1, 'user_id': uid, 'offset': o,'limit':l }) },
	}

}