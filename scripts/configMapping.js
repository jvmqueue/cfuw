define([], function(undefined){
    var _mapping = {
        viewToData:{
            HOME:{control:'btnHome', 
                data:'home.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                templateId:'templateHome'},
            MISSION_STATEMENT:{control:'btnMissionStatement', 
                data:'missionStatement.xml', 
                tagsXml:['paragraphs', 'paragraph'],
                tagsXmlChildsCommon:['heading', 'text'],
                templateId:'templateMissionStatement'},
            CONTACT_US:{control:'btnContactUs', 
                data:'contactUs.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                templateId:'templateContactUs'},
            BOARD:{control:'btnBoadMembers', 
                data:'board.xml', 
                tagsXml:['page', 'member'], 
                tagsXmlChildsCommon:['positionTitle', 'name', 'phone', 'email'],
                templateId:'templateBoardMembers'},
            AFFILIATIONS:{control:'btnAffiliations', 
                data:'affiliations.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                templateId:'templateAffiliations'},
            MEMBERSHIP_APPLICATION:{control:'btnMembershipApplication', 
                data:'membershipApplication.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                templateId:'templateMissionStatement'}
        }
    };

    return{
        mapping:_mapping
    }

}); // End define([] ...




